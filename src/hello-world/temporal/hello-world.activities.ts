export async function greetActivity(name: string): Promise<string> {
  const greeting = `Hello, ${name}! Welcome to the LOS Temporal workflow!`;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return greeting;
}
