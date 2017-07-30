'use strict';

import type {Action} from '../actions/types';
import {globalNav} from '../AppNavigator';
import { PUSH_NEW_ROUTE, POP_ROUTE, POP_TO_ROUTE, REPLACE_ROUTE, REPLACE_OR_PUSH_ROUTE } from '../actions/route';
import { REHYDRATE } from 'redux-persist/constants'

export type State = {
  routes: Array<string>
}

const initialState = {
  routes: ['home']
};

export default function (state:State = initialState, action:Action): State {

  
  if (action.type === PUSH_NEW_ROUTE) {
    globalNav.navigator.push({id: action.route});
    return {
      routes: [...state.routes, action.route]
    };
  }

  if (action.type === REPLACE_ROUTE) {
    globalNav.navigator.replaceWithAnimation({id: action.route});
    let routes = state.routes;
    routes.pop();
    return {
      routes: [...routes, action.route]
    };
  }

  
  if (action.type === REPLACE_OR_PUSH_ROUTE) {
    let routes = state.routes;

    if(routes[routes.length - 1] == 'login') {
      
      if(action.route != 'login')
        globalNav.navigator.push({id: action.route});
      else
        routes = [];
    }

    else {
      if(action.route == 'login') {
        globalNav.navigator.resetTo({id: 'login'});
        routes = [];
      }
      else {
        globalNav.navigator.replaceWithAnimation({id: action.route});
        routes.pop();
      }

    }

    return {
      routes: [...routes, action.route]
    };
  }

  if (action.type === POP_ROUTE) {
    globalNav.navigator.pop();
    let routes = state.routes;
    routes.pop();
    return {
      routes: routes
    }
  }

  if (action.type === POP_TO_ROUTE) {
    globalNav.navigator.popToRoute({id: action.route});
    let routes = state.routes;
    while (routes.pop() !== action.route) {}
    return {
      routes: [...routes, action.route]
    }
  }

  if (action.type === REHYDRATE) {
    const savedData = action['payload']['route'] || state;
    return {
      ...savedData
    }
  }

  return state;
}
