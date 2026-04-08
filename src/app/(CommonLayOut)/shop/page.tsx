import React from 'react'
import AllProduct from '../allproduct/page'

export default function page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; price?: string }>;
}) {
  return (
    <AllProduct searchParams={searchParams}></AllProduct>
  )
}
