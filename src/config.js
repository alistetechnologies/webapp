export const accessRoles = [
  {
    label: "Owner",
    description: "Can add and delete adminstrators, delete house, change owner",
    value: 0,
  },
  { label: "Admin", description: "Able to add / delete users", value: 1 },
  { label: "User", description: "Can only control appliances", value: 2 },
  {
    label: "Guest",
    description: "Same as user, but for a limited time",
    value: 3,
  },
];
