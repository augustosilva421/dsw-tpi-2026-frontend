import { getDoctors } from '../api/doctorsApi';

export const getDoctorOptions = async () => {
  const pageSize = 100;
  const first = await getDoctors({ pageSize });
  const pages = Math.ceil(first.total / pageSize);
  const remaining = await Promise.all(
    Array.from({ length: Math.max(0, pages - 1) }, (_, index) =>
      getDoctors({ page: index + 2, pageSize })
    )
  );

  return {
    data: [first, ...remaining].flatMap((page) => page.data ?? []),
    total: first.total,
  };
};
