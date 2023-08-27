class UserType {
    static NON_BUSINESS = 'non-business';
    static BUSINESS = 'business';
}

class UserRole {
    static ADMIN = 'admin';
    static SUPERVISOR = 'supervisor';
    static EMPLOYEE = 'Employee';
    static BUSINESS_EMPLOYEE = 'Business-Employee';
    static MD = 'MD';
}

class ActionType {
    static PERMISSIONS = 'PERMISSIONS';
    static TASK_ACTIVITY_PERMISSION = 'TASK_ACTIVITY_PERMISSION';
    static SEARCH_INPUT = 'SEARCH_INPUT';
}

export {UserType, UserRole, ActionType};