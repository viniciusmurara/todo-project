

export function handlePriority(priority: number): string {
    if (priority === 1) {
        return "bg-[#4B2E2C] border-[#FF7066]"
    } else if (priority === 2) {
        return "bg-[#4B371B] border-[#FF9A13]"
    } else if (priority === 3) {
        return "bg-[#28364B] border-[#5297FF]"
    } else {
        return "border-white"
    }
}