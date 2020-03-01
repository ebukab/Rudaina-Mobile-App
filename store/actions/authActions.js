export const USER = 'USER';

export const user = userDetails => {
    // console.log("user details action")
    return { type: USER, user: userDetails };
};


