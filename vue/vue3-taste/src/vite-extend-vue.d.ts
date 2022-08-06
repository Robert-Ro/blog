import axios from 'axios'

// NOTE 模块扩充必须是一个.ts文件或者一个以全局项目为范围的`.d.ts`文件，无论哪一种，必须确保在tsconfig中被引入。如果是库或插件，则必须添加在package.json的types中。
// NOTE 模块扩充必须添加在typescript模块中，也就是说，文件需要包含至少一个顶级的import或export。如果扩充在模块之外，它将覆盖原始类型，而不是扩充。

declare module 'vue' {
    interface ComponentCustomProperties {
        $http: typeof axios
        $translate: (key: string) => string
    }
}
