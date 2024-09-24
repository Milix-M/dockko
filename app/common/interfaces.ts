export interface Container {
    "Id": string
    "Names": string[]
    "Image": string
    "ImageID": string
    "Command": string
    "Created": number
    "Ports": [{
        "PrivatePort": number
        "PublicPort": number
        "Type": string
    }]
    "Labels": Record<string, string>
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

export interface ContainerDetails {
    "AppArmorProfile": string
    "Args": string[]
    "Config": {
        "AttachStderr": boolean
        "AttachStdin": boolean
        "AttachStdout": boolean
        "Cmd": string[]
        "Domainname": string
        "Env": string[]
        "Healthcheck": {
            "Test": string[]
        }
        "Hostname": string
        "Image": string
        "Labels": {
            string: string
        }
        "MacAddress": string
        "NetworkDisabled": boolean
        "OpenStdin": boolean
        "StdinOnce": boolean
        "Tty": boolean
        "User": string
        "Volumes": {
            string: { string: string }
        }
        "WorkingDir": string
        "StopSignal": string
        "StopTimeout": number
    }
    "Created": number
    "Driver": string
    "ExecIDs": string[]
    "HostConfig": {
        "MaximumIOps": number
        "MaximumIOBps": number
        "BlkioWeight": number
        "BlkioWeightDevice": [
            { string: string }
        ]
        "BlkioDeviceReadBps": [
            { string: string }
        ]
        "BlkioDeviceWriteBps": [
            { string: string }
        ]
        "BlkioDeviceReadIOps": [
            { string: string }
        ]
        "BlkioDeviceWriteIOps": [
            { string: string }
        ]
        "ContainerIDFile": string
        "CpusetCpus": string
        "CpusetMems": string
        "CpuPercent": number
        "CpuShares": number
        "CpuPeriod": number
        "CpuRealtimePeriod": number
        "CpuRealtimeRuntime": number
        "Devices": string[]
        "DeviceRequests": [
            {
                "Driver": string
                "Count": number
                "DeviceIDs": string[]
                "Capabilities": [
                    string[]
                ]
                "Options": {
                    string: string
                }
            }
        ]
        "IpcMode": string
        "Memory": number
        "MemorySwap": number
        "MemoryReservation": number
        "OomKillDisable": boolean
        "OomScoreAdj": number
        "NetworkMode": string
        "PidMode": string
        "PortBindings": Record<string, { "HostPort": string }[]>
        "Privileged": boolean
        "ReadonlyRootfs": boolean
        "PublishAllPorts": boolean
        "RestartPolicy": {
            "MaximumRetryCount": number
            "Name": string
        }
        "LogConfig": {
            "Type": string
        }
        "Sysctls": {
            "net.ipv4.ip_forward": string
        }
        "Ulimits": [
            { string: string }
        ]
        "VolumeDriver": string
        "ShmSize": number

    }
    "HostnamePath": string
    "HostsPath": string
    "LogPath": string
    "Id": string
    "Image": string
    "MountLabel": string
    "Name": string
    "NetworkSettings": {
        "Bridge": string
        "SandboxID": string
        "HairpinMode": boolean
        "LinkLocalIPv6Address": string
        "LinkLocalIPv6PrefixLen": number
        "SandboxKey": string
        "EndpointID": string
        "Gateway": string
        "GlobalIPv6Address": string
        "GlobalIPv6PrefixLen": number
        "IPAddress": string
        "IPPrefixLen": number
        "IPv6Gateway": string
        "MacAddress": string
        "Networks": {
            "bridge": {
                "NetworkID": string
                "EndpointID": string
                "Gateway": string
                "IPAddress": string
                "IPPrefixLen": number
                "IPv6Gateway": string
                "GlobalIPv6Address": string
                "GlobalIPv6PrefixLen": number
                "MacAddress": string
            }
        }
    }
    "Path": string
    "ProcessLabel": string
    "ResolvConfPath": string
    "RestartCount": number
    "State": {
        "Error": string
        "ExitCode": number
        "FinishedAt": string
        "Health": {
            "Status": string
            "FailingStreak": number
            "Log": [
                {
                    "Start": string
                    "End": string
                    "ExitCode": number
                    "Output": string
                }
            ]
        }
        "OOMKilled": boolean
        "Dead": boolean
        "Paused": boolean
        "Pid": number
        "Restarting": boolean
        "Running": boolean
        "StartedAt": string
        "Status": string
    }
    "Mounts": [
        {
            "Name": string
            "Source": string
            "Destination": string
            "Driver": string
            "Mode": string
            "RW": boolean
            "Propagation": string
        }
    ]
}
