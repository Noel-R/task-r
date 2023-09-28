// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

const states = [
    {name: "Incomplete", id: 1},
    {name: "In Progress", id: 2},
    {name: "Complete", id: 3},
    {name: "Archived", id: 4},
    {name: "Deleted", id: 5}
]

const Task = {
    title: "Test Task",
    contents: "This is a test task",
    stateId: 1
}

async function main() {
    
    states.forEach(async (state) => {
        var ret = await prisma.state.create({
            data: {
                name: state.name,
                id: state.id
            }
        })
        console.log(ret);
    });

    var task = await prisma.task.create({data: {
        title: Task.title,
        contents: Task.contents,
        stateId: Task.stateId
    }});

    console.log(task);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
