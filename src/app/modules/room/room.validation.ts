import { z } from 'zod';

const create = z.object({
  body: z.object({
    roomNumber: z.string({
      required_error: 'room number is required',
    }),
    floor: z.string({
      required_error: 'floor number is required',
    }),
    buildingId: z.string({
      required_error: 'building is required',
    }),
  }),
});

export const RoomValidation = {
  create,
};
