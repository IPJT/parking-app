import { FragmentType, graphql, useFragment } from '../../__generated__'

type Props = {
  vehicle: FragmentType<typeof AdminVehicleItem_VehicleFragment>
}

export const AdminVehicleItem = (props: Props) => {
  const vehicle = useFragment(AdminVehicleItem_VehicleFragment, props.vehicle)

  console.log(vehicle)
  return <p>{vehicle.brand}</p>
}

const AdminVehicleItem_VehicleFragment = graphql(/* GraphQL */ `
  fragment AdminVehicleItem_VehicleFragment on Vehicle {
    name
    brand
    status
    owner
  }
`)
