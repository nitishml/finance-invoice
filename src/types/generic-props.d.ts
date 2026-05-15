export type GenericProps<T = unknown> = {
    children?: React.ReactNode
    className?: string
} & T

export interface PaginationResponse {
    page: number;
    limit: number;
    total: number;
    pages: number;
}
