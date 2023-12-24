import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingFilterableFiled } from './building.constants';
import { BuildService } from './building.service';

const createBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildService.createBuilding(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create building successfully!',
    data: result,
  });
});

const getAllBuilding = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, buildingFilterableFiled);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await BuildService.getAllBuilding(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all building successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBuilding = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuildService.getSingleBuilding(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single building successfully!',
    data: result,
  });
});

const updateBuilding = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await BuildService.updateBuilding(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single building successfully!',
    data: result,
  });
});

const deleteBuilding = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuildService.deleteBuilding(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single building successfully!',
    data: result,
  });
});

export const BuildingController = {
  createBuilding,
  getAllBuilding,
  getSingleBuilding,
  updateBuilding,
  deleteBuilding,
};
