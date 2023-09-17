import { useState } from 'react'
import { Toggle as ToggleGroup } from './ToggleGroup'
import styled from 'styled-components'

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
        <p>{selectedToggleItem}</p>
      </AdminPanelContainer>
    </Page>
  )
}

const AdminPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Page = styled.div`
  padding: 1rem;
`
