const containerDetailJSON = {
    "AppArmorProfile": "",
    "Args": [
        "-c",
        "exit 9"
    ],
    "Config": {
        "AttachStderr": true,
        "AttachStdin": false,
        "AttachStdout": true,
        "Cmd": [
            "/bin/sh",
            "-c",
            "exit 9"
        ],
        "Domainname": "",
        "Env": [
            "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
        ],
        "Healthcheck": {
            "Test": [
                "CMD-SHELL",
                "exit 0"
            ]
        },
        "Hostname": "ba033ac44011",
        "Image": "ubuntu",
        "Labels": {
            "com.example.vendor": "Acme",
            "com.example.license": "GPL",
            "com.example.version": "1.0"
        },
        "MacAddress": "",
        "NetworkDisabled": false,
        "OpenStdin": false,
        "StdinOnce": false,
        "Tty": false,
        "User": "",
        "Volumes": {
            "/volumes/data": {}
        },
        "WorkingDir": "",
        "StopSignal": "SIGTERM",
        "StopTimeout": 10
    },
    "Created": "2015-01-06T15:47:31.485331387Z",
    "Driver": "overlay2",
    "ExecIDs": [
        "b35395de42bc8abd327f9dd65d913b9ba28c74d2f0734eeeae84fa1c616a0fca",
        "3fc1232e5cd20c8de182ed81178503dc6437f4e7ef12b52cc5e8de020652f1c4"
    ],
    "HostConfig": {
        "MaximumIOps": 0,
        "MaximumIOBps": 0,
        "BlkioWeight": 0,
        "BlkioWeightDevice": [
            {}
        ],
        "BlkioDeviceReadBps": [
            {}
        ],
        "BlkioDeviceWriteBps": [
            {}
        ],
        "BlkioDeviceReadIOps": [
            {}
        ],
        "BlkioDeviceWriteIOps": [
            {}
        ],
        "ContainerIDFile": "",
        "CpusetCpus": "",
        "CpusetMems": "",
        "CpuPercent": 80,
        "CpuShares": 0,
        "CpuPeriod": 100000,
        "CpuRealtimePeriod": 1000000,
        "CpuRealtimeRuntime": 10000,
        "Devices": [],
        "DeviceRequests": [
            {
                "Driver": "nvidia",
                "Count": -1,
                "DeviceIDs\"": [
                    "0",
                    "1",
                    "GPU-fef8089b-4820-abfc-e83e-94318197576e"
                ],
                "Capabilities": [
                    [
                        "gpu",
                        "nvidia",
                        "compute"
                    ]
                ],
                "Options": {
                    "property1": "string",
                    "property2": "string"
                }
            }
        ],
        "IpcMode": "",
        "Memory": 0,
        "MemorySwap": 0,
        "MemoryReservation": 0,
        "OomKillDisable": false,
        "OomScoreAdj": 500,
        "NetworkMode": "bridge",
        "PidMode": "",
        "PortBindings": {},
        "Privileged": false,
        "ReadonlyRootfs": false,
        "PublishAllPorts": false,
        "RestartPolicy": {
            "MaximumRetryCount": 2,
            "Name": "on-failure"
        },
        "LogConfig": {
            "Type": "json-file"
        },
        "Sysctls": {
            "net.ipv4.ip_forward": "1"
        },
        "Ulimits": [
            {}
        ],
        "VolumeDriver": "",
        "ShmSize": 67108864
    },
    "HostnamePath": "/var/lib/docker/containers/ba033ac4401106a3b513bc9d639eee123ad78ca3616b921167cd74b20e25ed39/hostname",
    "HostsPath": "/var/lib/docker/containers/ba033ac4401106a3b513bc9d639eee123ad78ca3616b921167cd74b20e25ed39/hosts",
    "LogPath": "/var/lib/docker/containers/1eb5fabf5a03807136561b3c00adcd2992b535d624d5e18b6cdc6a6844d9767b/1eb5fabf5a03807136561b3c00adcd2992b535d624d5e18b6cdc6a6844d9767b-json.log",
    "Id": "ba033ac4401106a3b513bc9d639eee123ad78ca3616b921167cd74b20e25ed39",
    "Image": "04c5d3b7b0656168630d3ba35d8889bd0e9caafcaeb3004d2bfbc47e7c5d35d2",
    "MountLabel": "",
    "Name": "/boring_euclid",
    "NetworkSettings": {
        "Bridge": "",
        "SandboxID": "",
        "HairpinMode": false,
        "LinkLocalIPv6Address": "",
        "LinkLocalIPv6PrefixLen": 0,
        "SandboxKey": "",
        "EndpointID": "",
        "Gateway": "",
        "GlobalIPv6Address": "",
        "GlobalIPv6PrefixLen": 0,
        "IPAddress": "",
        "IPPrefixLen": 0,
        "IPv6Gateway": "",
        "MacAddress": "",
        "Networks": {
            "bridge": {
                "NetworkID": "7ea29fc1412292a2d7bba362f9253545fecdfa8ce9a6e37dd10ba8bee7129812",
                "EndpointID": "7587b82f0dada3656fda26588aee72630c6fab1536d36e394b2bfbcf898c971d",
                "Gateway": "172.17.0.1",
                "IPAddress": "172.17.0.2",
                "IPPrefixLen": 16,
                "IPv6Gateway": "",
                "GlobalIPv6Address": "",
                "GlobalIPv6PrefixLen": 0,
                "MacAddress": "02:42:ac:12:00:02"
            }
        }
    },
    "Path": "/bin/sh",
    "ProcessLabel": "",
    "ResolvConfPath": "/var/lib/docker/containers/ba033ac4401106a3b513bc9d639eee123ad78ca3616b921167cd74b20e25ed39/resolv.conf",
    "RestartCount": 1,
    "State": {
        "Error": "",
        "ExitCode": 9,
        "FinishedAt": "2015-01-06T15:47:32.080254511Z",
        "Health": {
            "Status": "healthy",
            "FailingStreak": 0,
            "Log": [
                {
                    "Start": "2019-12-22T10:59:05.6385933Z",
                    "End": "2019-12-22T10:59:05.8078452Z",
                    "ExitCode": 0,
                    "Output": ""
                }
            ]
        },
        "OOMKilled": false,
        "Dead": false,
        "Paused": false,
        "Pid": 0,
        "Restarting": false,
        "Running": true,
        "StartedAt": "2015-01-06T15:47:32.072697474Z",
        "Status": "running"
    },
    "Mounts": [
        {
            "Name": "fac362...80535",
            "Source": "/data",
            "Destination": "/data",
            "Driver": "local",
            "Mode": "ro,Z",
            "RW": false,
            "Propagation": ""
        }
    ]
}

const containerJSON = [
    {
        "Id": "8dfafdbc3a40",
        "Names": [
            "/boring_feynman"
        ],
        "Image": "ubuntu:latest",
        "ImageID": "d74508fb6632491cea586a1fd7d748dfc5274cd6fdfedee309ecdcbc2bf5cb82",
        "Command": "echo 1",
        "Created": 1367854155,
        "State": "Exited",
        "Status": "Exit 0",
        "Ports": [
            {
                "PrivatePort": 2222,
                "PublicPort": 3333,
                "Type": "tcp"
            }
        ],
        "Labels": {
            "com.example.vendor": "Acme",
            "com.example.license": "GPL",
            "com.example.version": "1.0"
        },
        "SizeRw": 12288,
        "SizeRootFs": 0,
        "HostConfig": {
            "NetworkMode": "default",
            "Annotations": {
                "io.kubernetes.docker.type": "container"
            }
        },
        "NetworkSettings": {
            "Networks": {
                "bridge": {
                    "NetworkID": "7ea29fc1412292a2d7bba362f9253545fecdfa8ce9a6e37dd10ba8bee7129812",
                    "EndpointID": "2cdc4edb1ded3631c81f57966563e5c8525b81121bb3706a9a9a3ae102711f3f",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:02"
                }
            }
        },
        "Mounts": [
            {
                "Name": "fac362...80535",
                "Source": "/data",
                "Destination": "/data",
                "Driver": "local",
                "Mode": "ro,Z",
                "RW": false,
                "Propagation": ""
            }
        ]
    },
    {
        "Id": "9cd87474be90",
        "Names": [
            "/coolName"
        ],
        "Image": "ubuntu:latest",
        "ImageID": "d74508fb6632491cea586a1fd7d748dfc5274cd6fdfedee309ecdcbc2bf5cb82",
        "Command": "echo 222222",
        "Created": 1367854155,
        "State": "Exited",
        "Status": "Exit 0",
        "Ports": [],
        "Labels": {},
        "SizeRw": 12288,
        "SizeRootFs": 0,
        "HostConfig": {
            "NetworkMode": "default",
            "Annotations": {
                "io.kubernetes.docker.type": "container",
                "io.kubernetes.sandbox.id": "3befe639bed0fd6afdd65fd1fa84506756f59360ec4adc270b0fdac9be22b4d3"
            }
        },
        "NetworkSettings": {
            "Networks": {
                "bridge": {
                    "NetworkID": "7ea29fc1412292a2d7bba362f9253545fecdfa8ce9a6e37dd10ba8bee7129812",
                    "EndpointID": "88eaed7b37b38c2a3f0c4bc796494fdf51b270c2d22656412a2ca5d559a64d7a",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.8",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:08"
                }
            }
        },
        "Mounts": []
    },
    {
        "Id": "3176a2479c92",
        "Names": [
            "/sleepy_dog"
        ],
        "Image": "ubuntu:latest",
        "ImageID": "d74508fb6632491cea586a1fd7d748dfc5274cd6fdfedee309ecdcbc2bf5cb82",
        "Command": "echo 3333333333333333",
        "Created": 1367854154,
        "State": "Exited",
        "Status": "Exit 0",
        "Ports": [],
        "Labels": {},
        "SizeRw": 12288,
        "SizeRootFs": 0,
        "HostConfig": {
            "NetworkMode": "default",
            "Annotations": {
                "io.kubernetes.image.id": "d74508fb6632491cea586a1fd7d748dfc5274cd6fdfedee309ecdcbc2bf5cb82",
                "io.kubernetes.image.name": "ubuntu:latest"
            }
        },
        "NetworkSettings": {
            "Networks": {
                "bridge": {
                    "NetworkID": "7ea29fc1412292a2d7bba362f9253545fecdfa8ce9a6e37dd10ba8bee7129812",
                    "EndpointID": "8b27c041c30326d59cd6e6f510d4f8d1d570a228466f956edf7815508f78e30d",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.6",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:06"
                }
            }
        },
        "Mounts": []
    },
    {
        "Id": "4cb07b47f9fb",
        "Names": [
            "/running_cat"
        ],
        "Image": "ubuntu:latest",
        "ImageID": "d74508fb6632491cea586a1fd7d748dfc5274cd6fdfedee309ecdcbc2bf5cb82",
        "Command": "echo 444444444444444444444444444444444",
        "Created": 1367854152,
        "State": "Exited",
        "Status": "Exit 0",
        "Ports": [],
        "Labels": {},
        "SizeRw": 12288,
        "SizeRootFs": 0,
        "HostConfig": {
            "NetworkMode": "default",
            "Annotations": {
                "io.kubernetes.config.source": "api"
            }
        },
        "NetworkSettings": {
            "Networks": {
                "bridge": {
                    "NetworkID": "7ea29fc1412292a2d7bba362f9253545fecdfa8ce9a6e37dd10ba8bee7129812",
                    "EndpointID": "d91c7b2f0644403d7ef3095985ea0e2370325cd2332ff3a3225c4247328e66e9",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.5",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:05"
                }
            }
        },
        "Mounts": []
    }
]

export type nContainerDetail = typeof containerDetailJSON
export type nContainer = typeof containerJSON