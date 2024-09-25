import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { Form } from "@remix-run/react";
import React from "react";

type Prop = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    removeTarget: string
}

export default function ContainerRemoveConfirmModal({ open, setOpen, removeTarget }: Prop) {
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>このコンテナを削除しますか？</DialogHeader>
                <DialogBody>
                    削除を実行すると元には戻せません。<br />コンテナが実行中の場合は強制終了してからのコンテナ削除を試みます。
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>キャンセル</span>
                    </Button>
                    <Form replace method="post">
                        <input type="hidden" value={removeTarget} name="containerId" />

                        <Button variant="gradient" color="teal" onClick={handleOpen} type="submit" name="container" value="trash">
                            <span>削除</span>
                        </Button>
                    </Form>
                </DialogFooter>
            </Dialog>
        </>
    );
}