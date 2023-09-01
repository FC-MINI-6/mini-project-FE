import React, { useMemo } from 'react'
import { userListStore, userSelectedStore } from 'stores/index'

import { Select } from 'antd'

export const UserDropdown = React.memo(() => {
  const { userList } = userListStore()
  const { selectedId, setSelectedId } = userSelectedStore()

  const options = useMemo(() => {
    return userList.map(user => {
      return { value: user.id, label: user.username }
    })
  }, [userList])

  const onChange = (value: number) => {
    setSelectedId(value)
  }

  return (
    <Select
      style={{ minWidth: 100 }}
      showSearch
      popupMatchSelectWidth={100}
      value={selectedId}
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      options={options}
    />
  )
})
