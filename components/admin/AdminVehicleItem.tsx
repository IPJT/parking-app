import { FragmentType, graphql, useFragment } from '../../__generated__'

type Props = {
  vehicle: FragmentType<typeof AdminVehicleItem_VehicleFragment>
}

export const AdminVehicleItem = (props: Props) => {
  const vehicle = useFragment(AdminVehicleItem_VehicleFragment, props.vehicle)

  return (
    <>
      <td>{vehicle.vin}</td>
      <td>{vehicle.name}</td>
      <td>{vehicle.brand}</td>
      <td>{vehicle.owner}</td>
    </>
  )
}

const AdminVehicleItem_VehicleFragment = graphql(/* GraphQL */ `
  fragment AdminVehicleItem_VehicleFragment on Vehicle {
    vin
    name
    brand
    owner
  }
`)
