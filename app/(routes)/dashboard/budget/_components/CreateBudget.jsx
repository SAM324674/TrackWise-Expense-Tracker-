"use client"
import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import { randomUUID } from "crypto";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import 'emoji-picker-element';
import EmojiPicker from 'emoji-picker-react'
import { Budgets } from '@/utils/schema'
import { toast } from 'sonner'
import { db } from '@/utils/dbConfig'
import { useUser } from '@clerk/nextjs'
const CreateBudget = ({refreshData}) => {
    const [chosenEmoji, setChosenEmoji] = useState('🙂');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [Name, setName] = useState('');
    const [Amount, setAmount] = useState(0);
    const { user } = useUser();
    const [open,setOpen]=useState(false);
    // create a new Budget
    const onCreateBudget = async (e) => {
        e.preventDefault(); // prevent page reload
        try {
            const result = await db.insert(Budgets).values({
                id: Math.floor(Math.random() * 1000000), // 
                name: Name,
                amount: Amount,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                icon: chosenEmoji
            }).returning({ insertedId: Budgets.id });

            console.log(result);
            if (result) {toast("Budget Created Successfully");
                refreshData();
                setName("");
                setAmount(0);
                setChosenEmoji("🙂");
                setOpen(false);
            }
        } catch (err) {
            console.error(err);
            toast("Failed to create budget");
        }
    };
    return (



        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <div className=' m-3 bg-slate-200 p-10 h-[9.5rem] rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
                        <Plus />
                        Create New Budget
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New budget</DialogTitle>
                        {/* <DialogDescription> */}


                        {/* </DialogDescription> */}
                    </DialogHeader>
                    <Button
                        className="w-[4rem] "
                        variant={"outline"}
                        onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                    >{chosenEmoji}</Button>

                    <div className='absolute'>
                        <EmojiPicker

                            open={openEmojiPicker}
                            onEmojiClick={(e) => {
                                setChosenEmoji(e.emoji)
                                setOpenEmojiPicker(false);
                            }}
                        />
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1"> Budget Name</Label>
                            <Input id="name-1" name="name" placeholder="Grocery..." value={Name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="amount-1">Amount</Label>
                            <Input type="number" id="amount-1" name="amount" placeholder="1000" value={Amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter className="flex">
                        {/* <DialogClose asChild> */}
                            <Button className="flex w-full" type="submit" disabled={!(Name && Amount)} onClick={onCreateBudget}>Create Budget</Button>
                        {/* </DialogClose> */}
                        <DialogClose asChild>
                            <Button className="absolute top-1 right-4 z-50 bg-white text-black p-2 cursor-pointer" onClick={() => { setName(""); setAmount(""); setChosenEmoji("🙂"); }}>
                                <X />
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default CreateBudget