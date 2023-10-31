import { VehicleSearch_QueryQuery } from '../../../../__generated__/graphql'

export type VehicleFragment = NonNullable<VehicleSearch_QueryQuery['vehicleSearch']>['edges'][number]['node']

export type Location = { x: string; y: string }
