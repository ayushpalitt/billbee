import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  
  // Clear existing
  await prisma.expenseSplit.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.groupMember.deleteMany();
  await prisma.group.deleteMany();
  await prisma.settlement.deleteMany();
  await prisma.analyticsEvent.deleteMany();
  await prisma.aiInsight.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Users
  const user1 = await prisma.user.create({
    data: { clerk_id: "clerk_1", email: "alice@example.com", name: "Alice", financial_health_score: 92 },
  });
  const user2 = await prisma.user.create({
    data: { clerk_id: "clerk_2", email: "bob@example.com", name: "Bob", financial_health_score: 85 },
  });
  const user3 = await prisma.user.create({
    data: { clerk_id: "clerk_3", email: "charlie@example.com", name: "Charlie", financial_health_score: 78 },
  });

  // 2. Create Groups
  const tripGroup = await prisma.group.create({
    data: { name: "Paris Trip 2026" },
  });
  const aptGroup = await prisma.group.create({
    data: { name: "Downtown Apartment" },
  });
  const projectGroup = await prisma.group.create({
    data: { name: "Hackathon Team" },
  });

  // 3. Add Members
  await prisma.groupMember.createMany({
    data: [
      { user_id: user1.id, group_id: tripGroup.id, role: "ADMIN" },
      { user_id: user2.id, group_id: tripGroup.id },
      { user_id: user3.id, group_id: tripGroup.id },
      { user_id: user1.id, group_id: aptGroup.id, role: "ADMIN" },
      { user_id: user2.id, group_id: aptGroup.id },
    ],
  });

  // 4. Create Expenses (20+)
  for (let i = 0; i < 25; i++) {
    const creator = i % 2 === 0 ? user1 : user2;
    const amount = Math.floor(Math.random() * 200) + 20;
    const expense = await prisma.expense.create({
      data: {
        group_id: i % 3 === 0 ? tripGroup.id : aptGroup.id,
        created_by: creator.id,
        amount,
        category: ["Food", "Transport", "Accommodation", "Groceries"][i % 4],
        description: `Expense ${i}`,
      },
    });

    // Splits
    await prisma.expenseSplit.createMany({
      data: [
        { expense_id: expense.id, user_id: user1.id, amount_owed: amount / 2 },
        { expense_id: expense.id, user_id: user2.id, amount_owed: amount / 2 },
      ],
    });
  }

  // 5. Settlements
  await prisma.settlement.create({
    data: { payer_id: user2.id, payee_id: user1.id, amount: 150, status: "COMPLETED", settled_at: new Date() },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
