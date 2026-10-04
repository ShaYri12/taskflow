import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProfileController::edit
 * @see app/Http/Controllers/ProfileController.php:16
 * @route '/profile'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProfileController::edit
 * @see app/Http/Controllers/ProfileController.php:16
 * @route '/profile'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::edit
 * @see app/Http/Controllers/ProfileController.php:16
 * @route '/profile'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProfileController::edit
 * @see app/Http/Controllers/ProfileController.php:16
 * @route '/profile'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProfileController::edit
 * @see app/Http/Controllers/ProfileController.php:16
 * @route '/profile'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProfileController::edit
 * @see app/Http/Controllers/ProfileController.php:16
 * @route '/profile'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProfileController::edit
 * @see app/Http/Controllers/ProfileController.php:16
 * @route '/profile'
 */
        editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\ProfileController::updateInfo
 * @see app/Http/Controllers/ProfileController.php:23
 * @route '/profile/info'
 */
export const updateInfo = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateInfo.url(options),
    method: 'patch',
})

updateInfo.definition = {
    methods: ["patch"],
    url: '/profile/info',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ProfileController::updateInfo
 * @see app/Http/Controllers/ProfileController.php:23
 * @route '/profile/info'
 */
updateInfo.url = (options?: RouteQueryOptions) => {
    return updateInfo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::updateInfo
 * @see app/Http/Controllers/ProfileController.php:23
 * @route '/profile/info'
 */
updateInfo.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateInfo.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ProfileController::updateInfo
 * @see app/Http/Controllers/ProfileController.php:23
 * @route '/profile/info'
 */
    const updateInfoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateInfo.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProfileController::updateInfo
 * @see app/Http/Controllers/ProfileController.php:23
 * @route '/profile/info'
 */
        updateInfoForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateInfo.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateInfo.form = updateInfoForm
/**
* @see \App\Http\Controllers\ProfileController::updatePassword
 * @see app/Http/Controllers/ProfileController.php:37
 * @route '/profile/password'
 */
export const updatePassword = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePassword.url(options),
    method: 'patch',
})

updatePassword.definition = {
    methods: ["patch"],
    url: '/profile/password',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ProfileController::updatePassword
 * @see app/Http/Controllers/ProfileController.php:37
 * @route '/profile/password'
 */
updatePassword.url = (options?: RouteQueryOptions) => {
    return updatePassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::updatePassword
 * @see app/Http/Controllers/ProfileController.php:37
 * @route '/profile/password'
 */
updatePassword.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePassword.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ProfileController::updatePassword
 * @see app/Http/Controllers/ProfileController.php:37
 * @route '/profile/password'
 */
    const updatePasswordForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatePassword.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProfileController::updatePassword
 * @see app/Http/Controllers/ProfileController.php:37
 * @route '/profile/password'
 */
        updatePasswordForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatePassword.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updatePassword.form = updatePasswordForm
/**
* @see \App\Http\Controllers\ProfileController::destroy
 * @see app/Http/Controllers/ProfileController.php:57
 * @route '/profile'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/profile',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProfileController::destroy
 * @see app/Http/Controllers/ProfileController.php:57
 * @route '/profile'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::destroy
 * @see app/Http/Controllers/ProfileController.php:57
 * @route '/profile'
 */
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProfileController::destroy
 * @see app/Http/Controllers/ProfileController.php:57
 * @route '/profile'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProfileController::destroy
 * @see app/Http/Controllers/ProfileController.php:57
 * @route '/profile'
 */
        destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ProfileController = { edit, updateInfo, updatePassword, destroy }

export default ProfileController