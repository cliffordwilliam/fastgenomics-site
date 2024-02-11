const IsUserAdmin = (userId: string | null | undefined) => {
  return process.env.NEXT_PUBLIC_ADMIN_ID === userId;
};

export default IsUserAdmin;
