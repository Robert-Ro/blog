type SpecifiedKeys = 'id' | 'name'

type TargetType = {
    [key in SpecifiedKeys]: any
} // { id: any; name: any; }
type TargetGeneric<O extends string | number | symbol> = {
    [key in O]: any
}

interface SourceInterface {
    readonly id: number
    name?: string
}

type TargetInstance = TargetGeneric<SpecifiedKeys> // { id: any; name: any; }

type TargetGenericTypeAssertiony<S> = {
    [key in keyof S as Exclude<key, 'id'>]: S[key]
}

type TargetGenericTypeAssertionyInstance =
    TargetGenericTypeAssertiony<SourceInterface> // { name?: string | undefined; }
