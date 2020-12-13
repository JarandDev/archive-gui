function isValidRedirectUrl(redirectUrl) {
    return /https:\/\/[a-z0-9-]*[.]*jarand\.dev/g.test(redirectUrl);
}

export {isValidRedirectUrl};
