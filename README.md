# QUẢN LÝ ĐƠN HÀNG & TRẠNG THÁI XỬ LÝ

## 1. Mô tả nghiệp vụ
Hệ thống quản lý đơn hàng phát sinh từ khách hàng.  
Mỗi đơn hàng có vòng đời trạng thái và chỉ được chuyển trạng thái theo quy tắc nghiệp vụ.  
Dữ liệu đơn hàng **không bị xoá**, chỉ thay đổi trạng thái để đảm bảo truy vết.

## 2. Trạng thái đơn hàng
- NEW
- CONFIRMED
- PROCESSING
- COMPLETED
- CANCELED

### Quy tắc
- Không chuyển trạng thái từ `COMPLETED`
- Đơn hàng `CANCELED` không được xử lý tiếp
- Không sửa trạng thái bằng CRUD thông thường

## 3. SQL tạo bảng
- chạy file databse.sql

## 4. API chính
| Method | API                     |
| ------ | ----------------------- |
| GET    | /api/orders             |
| POST   | /api/orders             |
| PUT    | /api/orders/{id}/status |
| DELETE | /api/orders/{id}        |

