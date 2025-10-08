"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { PenBox, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { toast } from 'sonner'
import { eq } from 'drizzle-orm'
const EditBudget = ({budgetInfo,refreshData}) => {
    const [open, setOpen] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [Name, setName] = useState(budgetInfo?.name);
    const [Amount, setAmount] = useState(budgetInfo?.amount);
    const { user } = useUser();

    const onUpdateBudget=async()=>{
        const result=await db.update(Budgets).set({
            name:Name,
            amount:Amount,
            icon:chosenEmoji
        }).where(eq(Budgets.id,budgetInfo.id)).returning();

        if(result){
            refreshData();
            toast("Budget Updated");
            setOpen(false);
        }
    }
    return (
        <>

            <Dialog open={open} onOpenChange={setOpen}>
                
                <form>
                 
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Update budget</DialogTitle>
                            {/* <DialogDescription> */}


                            {/* </DialogDescription> */}
                        </DialogHeader>
                        <Button
                            className="w-[4rem] "
                            variant={"outline"}
                            onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                        >{budgetInfo?.icon}</Button>

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
                                <Input id="name-1" name="name" placeholder="Grocery..." value={Name} defaultValue={budgetInfo?.name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="amount-1">Amount</Label>
                                <Input type="number" id="amount-1" name="amount" placeholder="1000" value={Amount} defaultValue={budgetInfo?.amount} onChange={(e) => setAmount(e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter className="flex">
                            {/* <DialogClose asChild> */}
                            <Button className="flex w-full" type="submit" disabled={!(Name && Amount)} onClick={()=>onUpdateBudget()}>Update Budget</Button>
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

        </>
    )
}

export default EditBudget