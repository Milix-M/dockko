const ImageJSON = {
  Id: "sha256:ec3f0931a6e6b6855d76b2d7b0be30e81860baccd891b2e243280bf1cd8ad710",
  ParentId: "",
  RepoTags: [
    "example:1.0",
    "example:latest",
    "example:stable",
    "internal.registry.example.com:5000/example:1.0",
  ],
  RepoDigests: [
    "example@sha256:afcc7f1ac1b49db317a7196c902e61c6c3c4607d63599ee1a82d702d249a0ccb",
    "internal.registry.example.com:5000/example@sha256:b69959407d21e8a062e0416bf13405bb2b71ed7a84dde4158ebafacfa06f5578",
  ],
  Created: 1644009612,
  Size: 172064416,
  SharedSize: 1239828,
  VirtualSize: 172064416,
  Labels: {
    string: "some-value",
  },
  Containers: 2,
  Manifests: [
    {
      ID: "sha256:95869fbcf224d947ace8d61d0e931d49e31bb7fc67fffbbe9c3198c33aa8e93f",
      Descriptor: {
        mediaType: "application/vnd.docker.distribution.manifest.v2+json",
        digest:
          "sha256:c0537ff6a5218ef531ece93d4984efc99bbf3f7497c0a7726c88e2bb7584dc96",
        size: 3987495,
      },
      Available: true,
      Size: {
        Total: 8213251,
        Content: 3987495,
      },
      Kind: "image",
      ImageData: {
        Platform: {
          architecture: "arm",
          os: "windows",
          "os.version": "10.0.19041.1165",
          "os.features": ["win32k"],
          variant: "v7",
        },
        Containers: [
          "ede54ee1fda366ab42f824e8a5ffd195155d853ceaec74a927f249ea270c7430",
          "abadbce344c096744d8d6071a90d474d28af8f1034b5ea9fb03c3f4bfc6d005e",
        ],
        Size: {
          Unpacked: 3987495,
        },
      },
      AttestationData: {
        For: "sha256:95869fbcf224d947ace8d61d0e931d49e31bb7fc67fffbbe9c3198c33aa8e93f",
      },
    },
  ],
};

export type Image = typeof ImageJSON;
