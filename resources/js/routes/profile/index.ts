import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
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
* @see \App\Http\Controllers\ProfileController::info
 * @see app/Http/Controllers/ProfileController.php:23
 * @route '/profile/info'
 */
export const info = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: info.url(options),
    method: 'patch',
})

info.definition = {
    methods: ["patch"],
    url: '/profile/info',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ProfileController::info
 * @see app/Http/Controllers/ProfileController.php:23
 * @route '/profile/info'
 */
info.url = (options?: RouteQueryOptions) => {
    return info.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::info
 * @see app/Http/Controllers/ProfileController.php:23
 * @route '/profile/info'
 */
info.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: info.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ProfileController::info
 * @see app/Http/Controllers/ProfileController.php:23
 * @route '/profile/info'
 */
    const infoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: info.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProfileController::info
 * @see app/Http/Controllers/ProfileController.php:23
 * @route '/profile/info'
 */
        infoForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: info.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    info.form = infoForm
/**
* @see \App\Http\Controllers\ProfileController::password
 * @see app/Http/Controllers/ProfileController.php:37
 * @route '/profile/password'
 */
export const password = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: password.url(options),
    method: 'patch',
})

password.definition = {
    methods: ["patch"],
    url: '/profile/password',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ProfileController::password
 * @see app/Http/Controllers/ProfileController.php:37
 * @route '/profile/password'
 */
password.url = (options?: RouteQueryOptions) => {
    return password.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::password
 * @see app/Http/Controllers/ProfileController.php:37
 * @route '/profile/password'
 */
password.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: password.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ProfileController::password
 * @see app/Http/Controllers/ProfileController.php:37
 * @route '/profile/password'
 */
    const passwordForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: password.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProfileController::password
 * @see app/Http/Controllers/ProfileController.php:37
 * @route '/profile/password'
 */
        passwordForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: password.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    password.form = passwordForm
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
const profile = {
    edit: Object.assign(edit, edit),
info: Object.assign(info, info),
password: Object.assign(password, password),
destroy: Object.assign(destroy, destroy),
}

export default profile