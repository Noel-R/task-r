import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const data = await prisma.task.findUnique({
        select: {
            title: true,
            contents: true,
            created: true,
            state: {
                select: {
                    name: true
                }
            }
        },
        where: {
            id: id ? parseInt(id) : undefined
        }
    });

    if (data != null) {
        prisma.$disconnect();
        return new NextResponse(JSON.stringify(data), {
            status: 200,
        });
    } else {
        prisma.$disconnect();
        return new NextResponse(JSON.stringify({message: "No data found"}), {
            status: 404,
        });
    }
}

export async function PATCH(request: Request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const id = searchParams.get("id");
    const type = searchParams.get("type");

    if (id == null) {
        prisma.$disconnect();
        return new NextResponse(JSON.stringify({message: "No id provided"}), { status: 400 });
    }

    switch (type) {
        case "complete": {
            await prisma.task.update({ where: {
                id: parseInt(id)
            }, data: {
                state: {
                    connect: {
                        id: 3
                    }
                }
            }});
            prisma.$disconnect();
            return new NextResponse(JSON.stringify({message: "Task completed"}), { status: 200 });
        }
        case "archive": {
            await prisma.task.update({ where: {
                id: parseInt(id)
            }, data: {
                state: {
                    connect: {
                        id: 4
                    }
                }
            }});
            prisma.$disconnect();
            return new NextResponse(JSON.stringify({message: "Task archived"}), { status: 200 });
        }
        case "in progress": {
            await prisma.task.update({ where: {
                id: parseInt(id)
            }, data: {
                state: {
                    connect: {
                        id: 2
                    }
                }
            }});
            prisma.$disconnect();
            return new NextResponse(JSON.stringify({message: "Task in progress"}), { status: 200 });
        }
        case "incomplete": {
            await prisma.task.update({ where: {
                id: parseInt(id)
            }, data: {
                state: {
                    connect: {
                        id: 1
                    }
                }
            }});
            prisma.$disconnect();
            return new NextResponse(JSON.stringify({message: "Task incomplete"}), { status: 200 });
        }
        case "update": {
            const body = await request.json();
            await prisma.task.update({ where: {
                id: parseInt(id)
            }, data: {
                title: body.title,
                contents: body.contents
            }});
            prisma.$disconnect();
            return new NextResponse(JSON.stringify({message: "Task updated"}), { status: 200 });
        }

        case "default": {
            prisma.$disconnect();
            return new NextResponse(JSON.stringify({message: "No instruction provided"}), { status: 400 });
        }
    }

}