import AuthController from './AuthController'
import TaskController from './TaskController'
import ProfileController from './ProfileController'
const Controllers = {
    AuthController: Object.assign(AuthController, AuthController),
TaskController: Object.assign(TaskController, TaskController),
ProfileController: Object.assign(ProfileController, ProfileController),
}

export default Controllers