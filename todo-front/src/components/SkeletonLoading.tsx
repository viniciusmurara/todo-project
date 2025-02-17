interface SkeletonLoadingProps {
    className?: string
}

export default function SkeletonLoading({ className } : SkeletonLoadingProps) {
    return (
        <div className={`flex flex-col w-full animate-pulse ${className}`}>
            {/* Título */}
            <div className="h-8 bg-gray-700 rounded w-48 mb-5"></div>

            {/* Contador de tarefas */}
            <div className="flex gap-2 items-center mb-10">
                <div className="h-5 w-5 bg-gray-700 rounded"></div>
                <div className="h-5 bg-gray-700 rounded w-20"></div>
            </div>

            {/* Lista de tarefas */}
            <div className="flex flex-col w-full gap-6">
                {[...Array(2)].map((_, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        {/* Tarefa */}
                        <div className="flex justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-5 bg-gray-700 rounded-full"></div>
                                <div className="h-4 w-64 bg-gray-700 rounded"></div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className="h-5 w-5 bg-gray-700 rounded-full"></div>
                                <div className="h-5 w-5 bg-gray-700 rounded-full"></div>
                            </div>
                        </div>
                        {/* Linha divisória */}
                        <div className="h-px bg-gray-700 mt-4"></div>
                    </div>
                ))}
            </div>

            {/* Contador de tarefas */}
            <div className="flex gap-2 items-center mt-8">
                <div className="h-5 w-5 bg-gray-700 rounded"></div>
                <div className="h-5 bg-gray-700 rounded w-20"></div>
            </div>
        </div>
    );
}