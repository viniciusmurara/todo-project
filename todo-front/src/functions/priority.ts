type PriorityClasses = {
    container: string;
    icon: string;
};

export function getPriorityClasses(priority: number): PriorityClasses {
    switch (priority) {
        case 1:
            return {
                container: "bg-[#4B2E2C] border-[#FF7066]",
                icon: "text-[#FF7066]" // Mudamos para text-color
            };
        case 2:
            return {
                container: "bg-[#4B371B] border-[#FF9A13]",
                icon: "text-[#FF9A13]"
            };
        case 3:
            return {
                container: "bg-[#28364B] border-[#5297FF]",
                icon: "text-[#5297FF]"
            };
        default:
            return {
                container: "border-white",
                icon: "text-white"
            };
    }
}