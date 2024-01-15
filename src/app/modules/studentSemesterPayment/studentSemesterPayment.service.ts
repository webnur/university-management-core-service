import { PrismaClient } from '@prisma/client';
import {
  DefaultArgs,
  PrismaClientOptions,
} from '@prisma/client/runtime/library';

const createSemesterPayment = async (
  prismaTransactionClient: Omit<
    PrismaClient<PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  payload: {
    studentId: string;
    academicSemesterId: string;
    totalPaymentAmount: number;
  }
) => {
  const isExist =
    await prismaTransactionClient.studentSemesterPayment.findFirst({
      where: {
        student: {
          id: payload.studentId,
        },
        academicSemester: {
          id: payload.academicSemesterId,
        },
      },
    });

  if (!isExist) {
    const dataToInsert = {
      studentId: payload.studentId,
      academicSemesterId: payload.academicSemesterId,
      fullPaymentAmount: payload.totalPaymentAmount,
      partialPaymentAmount: payload.totalPaymentAmount * 0.5,
      totalDueAmount: payload.totalPaymentAmount,
      totalpaidAmount: 0,
    };
    await prismaTransactionClient.studentSemesterPayment.create({
      data: dataToInsert,
    });
  }
};

export const StudentSemesterPaymentService = {
  createSemesterPayment,
};
