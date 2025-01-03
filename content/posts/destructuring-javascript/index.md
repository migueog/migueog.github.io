---
title: Learning about Destructuring
description: A real world application on how destructuring can be used
slug: home
date: 2022-03-06 00:00:00+0000
categories:
    - Code Category
tags:
    - code
    - javascript
    - destructuring
weight: 1
---

I'm starting the new year with refreshing and solidifying some Javascript and programming fundamentals. I've been reading up about destructuring and I want to write about what a real world application of this concept would be. I find that providing a real world example is necessary to understand why and how this can be used.

Let's do a quick recap:

Destructuring is a tool that is used to unpack values from arrays or objects into distinct variables. Here are two examples of how it can be used:

This following example is used to unpack the values from an object that when received, it looks a bit complicated and excessive but once we destructure the objects, they can be transformed into something much easier to read and understand their intent.

```
const response = {
  data: {
    user: {
      profile: {
        name: 'John',
        email: 'john@example.com'
      }
    }
  }
};

// Without destructuring
console.log(response.data.user.profile.name);  // Output: "John"
console.log(response.data.user.profile.email); // Output: "john@example.com"

// With destructuring
const { data: { user: { profile: { name, email } } } } = response;
console.log(name);   // Output: "John"
console.log(email);  // Output: "john@example.com"
```

The second example is demonstrating how you can use destructuring to make a function's parameters more explicit and selective.

```
// Instead of:
function processOrder(order) {
  const total = order.price * order.quantity;
  const shipping = order.shippingMethod;
}

// You can do:
function processOrder({ price, quantity, shippingMethod }) {
  const total = price * quantity;
  const shipping = shippingMethod;
}
```

Now that we've done a light overview of destructuring and it's use cases, let's look into a real world example.

Let's assume we are building a feature where we display user info. The following code is what it would look like without destructuring:

```
function displayUserInfo(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
  const email = user.email;
  
  console.log(`Welcome ${firstName} ${lastName}!`);
  console.log(`We'll contact you at ${email}`);
}

const user = {
  firstName: 'Sarah',
  lastName: 'Smith',
  email: 'sarah@example.com',
  age: 28,
  location: 'New York'
};

displayUserInfo(user);
```

Now with destructuring:

```
function displayUserInfo({ firstName, lastName, email }) {
  console.log(`Welcome ${firstName} ${lastName}!`);
  console.log(`We'll contact you at ${email}`);
}

const user = {
  firstName: 'Sarah',
  lastName: 'Smith',
  email: 'sarah@example.com',
  age: 28,
  location: 'New York'
};

displayUserInfo(user);
```

Much more concise and cleaner to read! Instead of creating constants where we assign the firstName, lastName, and email we are instead immediately unpacking those values inside of our function parameter. The method will still work even if keys are missing, but it will use undefined for any missing values. Let's expand our method a bit more in order to include some validation or default values.

Here is the method with validation:

```
function displayUserInfo({ firstName, lastName, email }) {
  if (!firstName || !lastName || !email) {
    throw new Error('Missing required user information');
  }
  
  console.log(`Welcome ${firstName} ${lastName}!`);
  console.log(`We'll contact you at ${email}`);
}
```

And here is the method with default values:

```
function displayUserInfo({ 
  firstName = 'Guest', 
  lastName = '', 
  email = 'no email provided' 
}) {
  console.log(`Welcome ${firstName} ${lastName}!`);
  console.log(`We'll contact you at ${email}`);
}
```

