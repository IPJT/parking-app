import { useState } from 'react'
import { Toggle as ToggleGroup } from './ToggleGroup'
import styled from 'styled-components'
import { AdminVehicleList } from './AdminVehicleList'

const TOGGLE_STATE_LIST = ['Users', 'Vehicles'] as const

type ToggleStateListTuple = typeof TOGGLE_STATE_LIST
type ToggleState = ToggleStateListTuple[number]

export const AdminPanel = () => {
  const [selectedToggleItem, setSelectedToggleItem] = useState<ToggleState>('Users')

  return (
    <Page>
      <AdminPanelContainer>
        <ToggleGroup
          toggleStateList={TOGGLE_STATE_LIST}
          selectedToggleItem={selectedToggleItem}
          setSelectedToggleItem={setSelectedToggleItem}
        />
        {selectedToggleItem === 'Users' && <p>Users</p>}
        {selectedToggleItem === 'Vehicles' && <AdminVehicleList />}
      </AdminPanelContainer>
    </Page>
  )
}

const AdminPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`

const Page = styled.div`
  padding: 1rem;
`
