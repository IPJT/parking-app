import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

type Props<T extends string> = {
  toggleStateList: readonly T[]
  selectedToggleItem: T
  setSelectedToggleItem: Dispatch<SetStateAction<T>>
}

export function Toggle<T extends string>({ toggleStateList, selectedToggleItem, setSelectedToggleItem }: Props<T>) {
  return (
    <StyledToggleGroupRoot
      type='single'
      value={selectedToggleItem}
      onValueChange={(value) => {
        if (value) {
          setSelectedToggleItem(value as T)
        }
      }}
    >
      {toggleStateList.map((toggleItem) => (
        <StyledToggleGroupItem value={toggleItem}>{toggleItem} </StyledToggleGroupItem>
      ))}
    </StyledToggleGroupRoot>
  )
}

const StyledToggleGroupRoot = styled(ToggleGroup.Root)`
  display: inline-flex;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px black;
  width: fit-content;
`

const StyledToggleGroupItem = styled(ToggleGroup.Item)`
  background-color: white;
  color: black;
  height: 35px;
  padding: 0px 10px;
  display: flex;
  font-size: 15px;
  line-height: 1;
  align-items: center;
  justify-content: center;
  margin-left: 1px;

  &:first-child {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &[data-state='on'] {
    background-color: red;
    color: white;
  }

  &:focus {
    position: relative;
    box-shadow: 0 0 0 2px black;
  }
`
