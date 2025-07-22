export const register = (req: Request, res: Response) => {
  const data = req.body;

  res.status(200).json({ status: "success", data });
};
