// schemas/userProfile.js
export default {
  name: 'userProfile',
  title: 'User Profile',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'User ID',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};