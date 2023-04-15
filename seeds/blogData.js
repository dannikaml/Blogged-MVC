module.exports = [
  {
    id: 1,
    title: 'My First Blog Post',
    contents: 'Hello, and welcome to my very first blog post! Im so excited to finally start sharing my thoughts and ideas with the world through this platform.',
    date_created: '2022-02-28 10:00:00',
    comments: [
      {
        id: 1,
        comment_text: 'Great first post!',
        date_created: '2022-03-01 10:00:00',
        user_id: 1,
        blog_id: 1,
      },
      {
        id: 2,
        comment_text: 'Looking forward to reading more from you!',
        date_created: '2022-03-01 11:00:00',
        user_id: 2,
        blog_id: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'Why I Love Tech',
    contents: 'Tech and web development has transformed the way we live and work, as well as how it has the potential to create positive change in the world.',
    date_created: '2022-03-01 14:30:00',
    comments: [
      {
        id: 3,
        comment_text: 'I completely agree with you!',
        date_created: '2022-03-02 10:00:00',
        user_id: 1,
        blog_id: 2,
      },
      {
        id: 4,
        comment_text: 'Great insights!',
        date_created: '2022-03-02 11:00:00',
        user_id: 3,
        blog_id: 2,
      },
    ],
  },
  {
    id: 3,
    title: 'React vs. Angular',
    contents: 'React is more lightweight and flexible, while Angular provides a more structured and opinionated approach to development.',
    date_created: '2022-03-03 08:45:00',
    comments: [
      {
        id: 5,
        comment_text: 'Interesting comparison!',
        date_created: '2022-03-04 10:00:00',
        user_id: 2,
        blog_id: 3,
      },
      {
        id: 6,
        comment_text: 'I prefer React, but you make a good case for Angular.',
        date_created: '2022-03-04 11:00:00',
        user_id: 1,
        blog_id: 3,
      },
    ],
  },
];

