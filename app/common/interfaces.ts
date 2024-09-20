export interface container {
    "id": string
    "Names": string[]
    "Image": string
    "ImageID": string
    "Command": string
    "Created": number
    "Ports": [{
        "PrivatePort": string
        "PublicPort": string
        "Type": string
    }]
    "Labels": { string: string }
    "SizeRw": number
    "SizeRootFs": number
    "State": string
    "Status": string
    "HostConfig": {
        "NetworkMode": string
        "Annotations": {
            string: string
        }
    }
    "NetworkSettings": {
        "Networks": {
            "bridge": {
                "IPAMConfig": string
                "Links": string
                "Aliases": string
                "MacAddress": string
                "DriverOpts": string
                "NetworkID": string
                "EndpointID": string
                "Gateway": string
                "IPAddress": string
                "IPPrefixLen": number
                "IPv6Gateway": string
                "GlobalIPv6Address": string
                "GlobalIPv6PrefixLen": number
                "DNSNames": string
            }
        }
    }
    "Mounts": [{
        "Name": string
        "Source": string
        "Destination": string
        "Driver": string
        "Mode": string
        "RW": boolean
        "Propagation": string
    }]
}