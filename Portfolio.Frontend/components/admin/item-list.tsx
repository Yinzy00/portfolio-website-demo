"use client"

import type { ReactNode } from "react"
import Button from "./button"

interface Item {
  id: string
  [key: string]: any
}

interface ItemListProps<T extends Item> {
  items: T[]
  renderItem: (item: T) => ReactNode
  onEdit: (item: T) => void
  onDelete: (id: string) => void
  emptyMessage?: string
}

export default function ItemList<T extends Item>({
  items,
  renderItem,
  onEdit,
  onDelete,
  emptyMessage = "No items found",
}: ItemListProps<T>) {
  if (items.length === 0) {
    return <p className="text-foreground/70">{emptyMessage}</p>
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-4">
          <div className="flex-1">{renderItem(item)}</div>
          <div className="ml-4 flex space-x-2">
            <Button variant="outline" onClick={() => onEdit(item)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => onDelete(item.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
