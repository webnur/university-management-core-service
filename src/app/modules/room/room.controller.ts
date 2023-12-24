import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { roomFilterableFields } from './room.constants';
import { RoomService } from './room.service';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await RoomService.createRoom(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create room successfully!',
    data: data,
  });
  return result;
});

const getAllRoom = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, roomFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await RoomService.getAllRoom(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all room successfully!',
    meta: result.meta,
    data: result.data,
  });
  return result;
});

const getSingleRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomService.getSingleRoom(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single room successfully!',
    data: result,
  });
  return result;
});

const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.params;
  const result = await RoomService.updateRoom(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'updated room successfully!',
    data: result,
  });
  return result;
});
const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomService.deleteRoom(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'deleted room successfully!',
    data: result,
  });
  return result;
});
export const RoomController = {
  createRoom,
  getAllRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
