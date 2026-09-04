import session from 'models/session';
import { ForbiddenError, UnauthorizedError } from './errors';
import authorization from 'models/authorization';
import user from 'models/user';

async function injectAnonymousOrUser(request, response, next) {
  if (request.cookies?.session_id) {
    try {
      await injectAuthenticatedUser(request);
    } catch (error) {
      throw error;
    }
  } else {
    await injectAnonymousUser(request);
  }
  return next();
}

function canRequest(feature) {
  return function canRequestMiddleware(request, response, next) {
    const userTryingRequest = request.context.user;
    console.log('USER TRY', userTryingRequest);
    if (authorization.can(userTryingRequest, feature)) {
      return next();
    }
    throw new ForbiddenError({});
  };
}

async function injectAuthenticatedUser(request) {
  const sessionToken = request.cookies.session_id;
  const sessionObject = await session.findOneValidByToken(sessionToken);
  const userObject = await user.findOneById(sessionObject.user_id);
  request.context = { ...request.context, user: userObject };
}

async function injectAnonymousUser(request) {
  const anonymousUserObject = {
    features: [
      'create:user',
      'read:activation_token',
      'create:session',
      'read:status',
    ],
  };
  request.context = { ...request.context, user: anonymousUserObject };
}

const middlewares = {
  injectAnonymousOrUser,
  canRequest,
};

export default middlewares;
