import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type ActionProps = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

type ActionsProps = {
    header?: string;
    actions: ActionProps[];
    size?: string;
};

export const Actions = ({ header, actions, size }: ActionsProps) => {
    return (
        <>
            <div className={cn('w-full min-h-[100px] h-full hidden md:flex flex-col gap-10 items-center justify-start mx-auto px-4', size)}>
                {/* <h2 className='text-4xl font-bold'>{header}</h2> */}
                <div
                    className={cn(
                        'grid gap-8 w-full',
                        actions.length === 2 && 'grid-cols-2',
                        actions.length === 3 && 'grid-cols-3',
                        actions.length === 4 && 'grid-cols-4',
                    )}
                >
                    {actions.map((action, index) => (
                        <HoverCard key={index} title={action.label} iconSrc={action.icon} href={action.href} />
                    ))}
                </div>
            </div>
            <div
                className={cn(
                    'flex flex-col items-center justify-center gap-2 md:hidden ',)}
            >

                {actions.map((action, index) => (
                    <Button key={index} asChild className='h-16 max-w-[250px] w-full' size={'lg'} >
                        <Link href={action.href}>
                            {action.icon}
                            {action.label}
                        </Link>
                    </Button>
                ))}
            </div>
        </>
    );
};


export const ComponentActions = ({ header, actions, size }: ActionsProps) => {
    return (
        <>
            <div
                className={cn(
                    'flex flex-col items-center justify-center gap-2 px-4 max-w-50 w-full',)}
            >

                {actions.map((action, index) => (
                    <Button key={index} asChild className='h-16 max-w-62.5 w-full' size={'lg'} >
                        <Link href={action.href}>
                            {action.icon}
                            {action.label}
                        </Link>
                    </Button>
                ))}
            </div>

        </>
    );
};


type Props = {
    title: string;
    iconSrc: React.ReactNode;
    href: string;
};

const HoverCard = ({ title, iconSrc, href }: Props) => {
    return (
        <Link href={`${href}`} className='w-full group'>
            <Card className='rounded-2xl bg-muted p-2 overflow-hidden group-hover:black relative z-10 flex flex-col'>
                <CardHeader>
                    <CardTitle className='font-semibold tracking-wide  text-center group-hover:scale-125 transition-transform duration-300 ease-in-out text-xl'>
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent className=' text-muted-foreground tracking-wide leading-relaxed flex items-center justify-center group-hover:scale-125 transition-transform duration-300 ease-in-out'>
                    {iconSrc}
                </CardContent>
            </Card>
        </Link>
    );
};

