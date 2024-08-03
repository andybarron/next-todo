import { sleep } from "@/util";

const DEBUG_DELAY = 0;

export async function delay() {
  if (!DEBUG_DELAY) return;
  await sleep(DEBUG_DELAY);
}
