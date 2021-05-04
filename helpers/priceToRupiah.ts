export const priceToRupiah = (price: number | string) => {
    const rupiahPrice = Number(price).toLocaleString('id-ID');

    return 'Rp ' + rupiahPrice;
}