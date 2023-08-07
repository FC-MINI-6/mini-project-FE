import { Skeleton, SkeletonProps, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

export type SkeletonTableColumnsType = {
  key: string
}

type SkeletonTableProps<T> = SkeletonProps & {
  columns: ColumnsType<T>
  rowCount?: number
}

export const SkeletonTable = <T extends object>({
  loading = false,
  rowCount = 5,
  columns,
  children
}: SkeletonTableProps<T>) => {
  return loading ? (
    <Table
      size="middle"
      rowKey="key"
      pagination={false}
      dataSource={[...Array(rowCount)] as T[]}
      columns={columns.map(column => {
        return {
          ...column,
          render: function renderPlaceholder() {
            return (
              <Skeleton
                key={column.key}
                title
                active
                paragraph={false}
                style={{ padding: '12 8' }}
              />
            )
          }
        }
      })}
    />
  ) : (
    <>{children}</>
  )
}
