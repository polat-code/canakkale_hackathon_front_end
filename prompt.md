## Girdi Değişkenleri

- **Kullanıcı ID:** `${user.id}`
- **Departman ID:** `${departman.id}`
- **Pozisyon ID:** `${pozisyon.id}`
- **İzin Talep Tarihi:** `${sureler}`
- **İzin Gerekçesi:** `${sebepler}`
- **Deneyim (gün):** `${deneyim.gun}`
- **Departman Maksimum İzinli Sayısı:** `${departman.maxGun}`
- **Tarih Esnekliği:** `${tarihEsnkeligi}`

---

## Kurallar

1. Başvuru metninde **acil durum** belirtilmişse bu başvurular önceliklidir.Gerekirse başka tarihler değiştirilebilir.
2. Aynı **pozisyondan** en fazla **2 kişi** aynı anda izinli olabilir.
3. Aynı **departmandan**, o tarih aralığında en fazla toplam çalışan sayısının **%20’si** izinli olabilir.
4. Departman bazlı izin sınırı `${departman.maxGun}` ile belirlenir.
5. Aşağıdaki **öncelik sırasına** göre değerlendirme yap:
   - **Tarihi değiştiremeyen** başvurular önceliklidir.
   - Başvuru metninde **acil durum** belirtilmişse bu başvurular önceliklidir.
6. Eğer talep edilen tarih uygun değilse:
   - **İzin reddedilmeli** ve kullanıcıya **uygun alternatif tarih önerilmeli**.
   - Önerilen tarih departman ve pozisyon limitlerini sonrasında önceki kuralları aşmamalıdır.


---

## Çıktı Formatı (JSON)

Her kullanıcı için çıktıyı aşağıdaki JSON formatında üret:

```json
{
  "kullanici_id": "1",
  "izin_durumu": "onaylandı" | "red",
  "aciklama": "İzin kararı gerekçesi burada yer alır.",
  "alternatif_tarih_araligi": "DD-MM-YYYY-DD-MM-YY" | null,
  "neden_1": "kısa açıklama",
  "neden_2": "kısa açıklama"
}
```