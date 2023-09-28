import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const id = searchParams.get("id");
    const data = await prisma.task.delete({
        where: {
            id: id ? parseInt(id) : undefined
        },
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

export async function POST(request: Request) {
    const body = await request.json();
    const data = await prisma.task.create({
        data: {
            title: body.title,
            contents: body.contents,
            stateId: body.stateId
        },
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
    const body = await request.json();
    const data = await prisma.task.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            contents: body.contents,
            stateId: body.stateId
        },
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

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const option = searchParams.get("type");
    console.log(option);
    let data;

    switch (option) {
        case "active": {
            data = await prisma.state.findMany({select: {
                name: true,
                tasks: {
                    select: {
                        id: true
                    }
                }
            },
            where: {
                name: {
                    in: ["Incomplete", "In Progress"]
                }
            }});
            break;
        }
        case "archived":
            data = await prisma.state.findFirst({select: {
                name: true,
                tasks: {
                    select: {
                        id: true
                    }
                }
            },
            where: {
                name: {
                    in: ["Archived", "Complete"]
                }
            }})
            break;
        case "deleted": {
            data = await prisma.state.findFirst({select: {
                name: true,
                tasks: {
                    select: {
                        id: true
                    }
                }
            },
            where: {
                name: "Deleted"
            }});
            break;
        }
        case "all": {
            data = await prisma.state.findMany({
                select: {
                    name: true,
                    tasks: {
                        select: {
                            id: true
                        }
                    }
                }
            });
            break;
        }
    }


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