export const errorHandler = (err, req, res, next) => {
  console.error("[SQL ERROR]", err);

  // MySQL SIGNAL 45000 shows as errno 1644 (ER_SIGNAL_EXCEPTION)
  const isSignal = err?.errno === 1644 || err?.code === 'ER_SIGNAL_EXCEPTION';
  const status = isSignal ? 400 : 500;

  return res.status(status).json({
    error: err.sqlMessage || err.message || "Unknown error",
    code: err.code || undefined,
    errno: err.errno || undefined,
  });
};
