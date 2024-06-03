import { select } from "@/utils/utils";

export default function useVixtaEventListener(target, event, callback) {
  if (typeof target === "string") {
    target = select(target);
  }
  target.addEventListener(event, callback);

  return () => target.removeEventListener(event, callback);
}
