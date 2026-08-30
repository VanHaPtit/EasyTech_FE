# QUY TẮC CLEAN CODE & TIÊU CHUẨN PHÁT TRIỂN BACKEND (SPRING BOOT)

*Tác giả: Tech Lead (10+ Years of Experience)*
*Cập nhật: 15/07/2026*
*Phạm vi áp dụng: Toàn bộ dự án Backend EazyLearn (easylearn-api)*

---

Chào các thành viên trong đội ngũ phát triển Backend EazyLearn.

Để giữ cho mã nguồn của chúng ta luôn sạch sẽ, dễ bảo trì, dễ kiểm thử và tránh tình trạng xung đột code (conflict) nát bét khi merge, mình thiết lập bộ **Quy tắc Clean Code**, **Phương pháp Code chuẩn (Base Code)**, và **Cấu trúc Thư mục Chuẩn** dưới đây. Tất cả mọi người bắt buộc phải tuân thủ nghiêm ngặt các quy tắc này. Không có ngoại lệ.

---

## PHẦN I: QUY TẮC CLEAN CODE HỆ THỐNG

### 1. Quy tắc Đặt tên (Naming Conventions) – Đọc là hiểu, không cần đoán

Tên class, biến, hàm phải rõ ràng về mặt ngữ nghĩa. Tuyệt đối không viết tắt vô nghĩa.

* **Class & Interface**: Sử dụng danh từ, viết hoa chữ cái đầu (`PascalCase`).
  * *Controllers*: Phải sử dụng danh từ số nhiều ở dạng `CamelCase`.
    * ✅ *Chuẩn*: `UsersController.java`, `ProductsController.java`
  * *Services & Repositories*: Phải đi kèm vai trò rõ ràng ở đuôi.
    * ✅ *Chuẩn*: `UserService.java` (Interface), `UserServiceImpl.java` (Implementation), `UserRepository.java`
* **Hàm (Methods)**: Phải bắt đầu bằng một **động từ**, viết theo dạng `camelCase`.
  * ✅ *Chuẩn*: `getUserById()`, `calculateTotalAmount()`, `isActive()`
* **Biến số (Variables)**: Sử dụng danh từ, viết theo dạng `camelCase`.
  * ✅ *Chuẩn*: `expiredDate`, `totalPrice`
  * ❌ *Tránh*: `usrId` (viết `userId`), `temp` (trừ vòng lặp cực ngắn).

---

### 2. Thiết kế API chuẩn RESTful – Không tự sáng tạo "luật" riêng

Chúng ta giao tiếp với Frontend qua API, do đó API phải có tính logic cao và chuẩn hóa.

* **Sử dụng đúng HTTP Methods**:
  * `GET`: Chỉ lấy dữ liệu (Tuyệt đối không được thay đổi trạng thái data dưới DB).
  * `POST`: Tạo mới dữ liệu.
  * `PUT`: Cập nhật toàn bộ đối tượng.
  * `PATCH`: Cập nhật một phần đối tượng.
  * `DELETE`: Xóa dữ liệu (Ưu tiên xóa mềm - soft delete thông qua cờ `deleted_at`).
* **Cấu trúc URL thống nhất**:
  * Sử dụng danh từ số nhiều:
    * ✅ *Tốt*: `GET /api/v1/orders`
    * ❌ *Tệ*: `GET /api/v1/get-all-orders`
  * Phân cấp rõ ràng:
    * ✅ *Tốt*: `GET /api/v1/users/{userId}/orders` (Lấy danh sách đơn hàng của một user cụ thể).

---

### 3. Kiến trúc 3 lớp (3-Tier Layered) – "Nhà ai nấy ở, việc ai nấy làm"

Phân chia ranh giới cực kỳ nghiêm ngặt giữa các tầng để tránh code chồng chéo lên nhau:

$$
\text{[Controller]} \longleftrightarrow \text{[Service]} \longleftrightarrow \text{[Repository]} \longleftrightarrow \text{[Database]}
$$

* **Controller phải cực kỳ "gầy" (Skinny Controller)**:
  * *Nhiệm vụ duy nhất*: Nhận request, check validate đầu vào cơ bản (`@Valid`), gọi Service, và trả về Response.
  * > [!WARNING]
    >
  * > CẤM viết bất kỳ dòng logic tính toán, check điều kiện hay câu query SQL nào trực tiếp ở tầng Controller.
    >
* **Service chứa trọn vẹn nghiệp vụ (Fat Service)**:
  * *Nhiệm vụ*: Tính toán logic, điều phối transaction, gọi các Repository.
  * > [!IMPORTANT]
    >
  * > **Quy tắc thép**: Một Service không được phép tương tác trực tiếp với Repository của Service khác. Nếu `UserService` cần thông tin từ `Order`, hãy inject `OrderService` chứ không được phép inject `OrderRepository`.
    >
* **Repository chỉ làm việc với DB**:
  * Không xử lý logic nghiệp vụ tại đây. Chỉ viết các hàm query (JPA method hoặc `@Query`).

---

### 4. Kiểm soát luồng dữ liệu bằng DTO (Data Transfer Object)

Đây là lỗi phổ biến nhất khiến code bị rối và rò rỉ dữ liệu DB.

> [!CAUTION]
> **QUY TẮC THÉP**: Tuyệt đối không bao giờ dùng trực tiếp Entity (class ánh xạ Database) làm dữ liệu đầu vào (Request) hoặc đầu ra (Response) của API.

* **Input**: Dùng `RequestDTO` (ví dụ: `RegisterRequestDTO`). Sử dụng các annotation của Spring Validation (`@NotNull`, `@Email`, `@Size`,...) để chặn dữ liệu rác ngay từ vòng gửi xe.
* **Output**: Dùng `ResponseDTO` (ví dụ: `UserResponseDTO`). Chúng ta chỉ trả về những trường Frontend cần. Tuyệt đối không trả về các thông tin nhạy cảm như `password`, `salt`, `internalStatus` ra ngoài.

---

### 5. Quản lý Exception tập trung (Global Exception Handling)

* **Không lạm dụng try-catch thủ công**: Hãy để lỗi tự "ném" (throw) lên trên.
* **Sử dụng `@ControllerAdvice`**: Khi có lỗi, hệ thống tự động bắt và format về một cấu trúc JSON duy nhất:
  ```json
  {
    "timestamp": "2026-07-15T13:52:42Z",
    "status": 400,
    "error": "Bad Request",
    "message": "Email đã tồn tại trên hệ thống",
    "code": "USER_EMAIL_ALREADY_EXISTS"
  }
  ```
* **Tự định nghĩa Business Exception**: Khi cần báo lỗi nghiệp vụ, hãy throw class tự định nghĩa (ví dụ: `throw new ResourceNotFoundException("User not found")`).

---

### 6. Git Workflow – Giữ gìn hòa bình khi Merge Code

* **Quy tắc nhánh (Branching)**:
  * `main` / `master`: Nhánh production, tuyệt đối không ai được push code trực tiếp lên đây.
  * `develop`: Nhánh tích hợp chính của cả đội.
  * `feature/feature-name` hoặc `bugfix/issue-id`: Nhánh cá nhân tự tạo để code task được giao.
* **Pull Request (PR) & Code Review**:
  * Trước khi gộp code vào `develop`, bắt buộc phải tạo Pull Request (PR).
  * Mỗi PR cần ít nhất **1 thành viên khác** (hoặc Tech Lead) review và approve.
  * > [!TIP]
    >
  * > Hãy giữ các PR ở quy mô nhỏ (dưới 300 dòng code). PR càng nhỏ thì tỷ lệ phát hiện lỗi càng cao và reviewer sẽ duyệt nhanh hơn.
    >

---

### 7. Các chi tiết nhỏ nhưng "võ công cao" (Lombok, Format, Comment)

* **Lombok thông minh**: Dùng `@Getter`, `@Setter`, `@RequiredArgsConstructor`. Hạn chế dùng `@Data` vô tội vạ trên các Entity JPA vì nó dễ gây ra lỗi vòng lặp vô hạn `toString()` hoặc `hashCode()`.
* **Formatter**: Cả đội sẽ dùng chung một cấu hình format code. Trước khi commit, hãy nhấn tổ hợp phím **`Ctrl + Alt + L`** (trên IntelliJ) để format lại code cho đẹp đẽ, đồng nhất.
* **Comment code**:
  * *"Code tốt là code tự giải thích được chính nó" (Self-documenting code)*.
  * Hạn chế comment mô tả hành động kiểu: `// Cộng thêm 1 -> count++;`
  * Hãy comment giải thích **TẠI SAO (WHY)** bạn viết đoạn logic phức tạp đó, chứ không phải giải thích **NÓ LÀM GÌ (WHAT)**.

---

---

## PHẦN II: PHƯƠNG PHÁP CODE CHUẨN (BASE CODE)

Chúng ta áp dụng đồng nhất các phương pháp code chuẩn dưới đây cho toàn bộ dự án:

### 1. Phương Pháp Xử Lý Ngoại Lệ (Exception Handling)

> [!IMPORTANT]
> **Không sử dụng try-catch và trả về ResponseEntity thủ công tại Controller.** Hệ thống sử dụng cơ chế xử lý ngoại lệ tập trung thông qua `@ControllerAdvice`.

#### Cấu trúc chuẩn:

1. **Tạo class Exception riêng biệt**: Kế thừa từ `RuntimeException` chứa thông tin mã lỗi (`statusCode`) và thông báo (`message`).

   ```java
   public class CustomException extends RuntimeException {
       private final Integer statusCode;
       private final String message;

       public CustomException(Integer statusCode, String message) {
           super(message);
           this.statusCode = statusCode;
           this.message = message;
       }

       public Integer getStatusCode() {
           return statusCode;
       }

       @Override
       public String getMessage() {
           return message;
       }
   }
   ```
2. **Xử lý ngoại lệ tập trung (Global Exception Handler)**: Sử dụng `@ControllerAdvice` để gom tất cả lỗi về một nơi xử lý và format đầu ra theo chuẩn `BaseResponse`.

   ```java
   import org.springframework.http.HttpHeaders;
   import org.springframework.http.HttpStatus;
   import org.springframework.http.ResponseEntity;
   import org.springframework.web.bind.annotation.ControllerAdvice;
   import org.springframework.web.bind.annotation.ExceptionHandler;
   import org.springframework.web.context.request.WebRequest;
   import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

   @ControllerAdvice
   public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

       @ExceptionHandler({CustomException.class})
       public ResponseEntity<Object> handleCustomException(CustomException ex, WebRequest request) {
           // Trả về BaseResponse với status = 0 (thất bại)
           return new ResponseEntity<>(
               new BaseResponse(0, ex.getMessage(), null), 
               new HttpHeaders(), 
               HttpStatus.valueOf(ex.getStatusCode())
           );
       }
   }
   ```
3. **Sử dụng**: Khi có lỗi, chỉ cần ném (`throw`) ngoại lệ ra ngoài.

   ```java
   if (product == null) {
       throw new CustomException(404, "Không tìm thấy sản phẩm");
   }
   ```

---

### 2. Phương Pháp Phân Trang (Pagination)

Hệ thống chuẩn hóa tham số đầu vào (Request) và định dạng đầu ra (Response) cho phân trang thay vì sử dụng trực tiếp đối tượng mặc định của Spring Data.

#### Cấu trúc chuẩn:

1. **Request (Đầu vào)**: Dùng DTO `PaginationRequest` để hứng d`ữ liệu phân trang và bộ lọc:

   ```java
   import jakarta.validation.constraints.Positive;

   public class PaginationRequest {
       @Positive(message = "limit phải là số lớn hơn 0")
       private Integer limit = 10;

       @Positive(message = "page phải là số lớn hơn 0")
       private Integer page = 1;

       private String searchText;
       private String orderBy; // Định dạng "price:DESC,name:ASC"

       // Getters & Setters
   }
   ```
2. **Response (Đầu ra)**: Dữ liệu phân trang luôn được bọc trong đối tượng `BasePagination<T>` để chuẩn hóa các thuộc tính trả về cho Client.

   ```java
   import org.springframework.data.domain.Page;
   import java.util.List;

   public class BasePagination<T> {
       private Integer current_page;
       private List<T> data;
       private Integer last_page;
       private Long total;

       public BasePagination(Page<T> page) {
           this.current_page = page.getPageable().getPageNumber() + 1; // Spring JPA page bắt đầu từ 0
           this.last_page = page.getTotalPages();
           this.total = page.getTotalElements();
           this.data = page.getContent();
       }

       // Getters & Setters
   }
   ```
3. **Tự động bọc trong BaseResponse**:

   ```java
   public class BaseResponse {
       private Integer status;
       private String message;
       private Object data; // payload

       public <T> BaseResponse(Page<T> pagePayload) {
           this.status = 1;
           this.message = "success";
           this.data = new BasePagination<T>(pagePayload);
       }
   }
   ```

---

### 3. Định dạng Response (BaseResponse)

Mọi API thành công hay thất bại trả về đều phải bọc trong `BaseResponse` để thống nhất cấu trúc cho Frontend:

* **Thành công (`status` = 1)**:
  ```json
  {
    "status": 1,
    "message": "success",
    "data": {
      "id": "123",
      "name": "Nguyễn Văn A"
    }
  }
  ```
* **Thất bại (`status` = 0)**:
  ```json
  {
    "status": 0,
    "message": "Không tìm thấy sản phẩm",
    "data": null
  }
  ```

---

### 4. Giao Tiếp Bằng DTO (Data Transfer Object)

> [!WARNING]
> Tuyệt đối không trả trực tiếp các JPA Entities ra ngoài API. Việc này giúp giấu đi các trường nhạy cảm và tránh lỗi Lazy Loading / vòng lặp vô hạn JSON.

```java
// Trong Controller: KHÔNG trả về List<Product> (Entity)
// MÀ PHẢI trả về List<ProductResponseDTO>
Page<Product> products = productRepository.findAll(pageable);

// Chuyển đổi Entity -> DTO trong Service
Page<ProductResponseDTO> dtoPage = products.map(product -> 
    new ProductResponseDTO(product.getId(), product.getName())
);

return new BaseResponse(dtoPage); // BaseResponse tự bọc thành BasePagination
```

---

### 5. Quy Định Về Import (Clean Code)

> [!CAUTION]
> Tuyệt đối KHÔNG viết đường dẫn package tuyệt đối (Fully Qualified Class Name) trực tiếp vào trong code Java. Mọi class bên ngoài đều phải được import ở đầu file.

* ❌ *Sai (Không được phép)*:
  ```java
  public interface ProductRepository extends JpaRepository<Product, Integer> {
      org.springframework.data.domain.Page<Product> findByIsActiveTrue(org.springframework.data.domain.Pageable pageable);
  }
  ```
* ✅ *Đúng (Chuẩn)*:
  ```java
  import org.springframework.data.domain.Page;
  import org.springframework.data.domain.Pageable;

  public interface ProductRepository extends JpaRepository<Product, Integer> {
      Page<Product> findByIsActiveTrue(Pageable pageable);
  }
  ```

---

### 6. Quy Định Về Bảo Mật & API Key (Security & Configuration)

> [!CAUTION]
> Tuyệt đối KHÔNG hardcode (viết cứng) các thông tin nhạy cảm (JWT secret key, Database password, API key...) vào trong mã nguồn Java.

#### Giải pháp chuẩn: "Cấu hình ở Properties, Giá trị lấy từ Environment"

* Tất cả các khoá cấu hình bảo mật, mật khẩu DB, và API Key (ví dụ: Gemini API Key, Firebase Credentials, Client Secret) bắt buộc phải được khai báo dạng biến tham chiếu placeholder lấy trực tiếp từ **Environment Variable (Biến môi trường)** trong tệp cấu hình dự án (`application.yml` hoặc `application.properties`).
* Tuyệt đối không push các API Key hoặc mật khẩu thực tế lên Git repository.
* *Trong tệp `application.yml` (hoặc `application.properties`)*:

  ```yaml
  # application.yml
  spring:
    datasource:
      url: ${DB_URL:jdbc:postgresql://localhost:5432/eazylearn}
      username: ${DB_USERNAME:postgres}
      password: ${DB_PASSWORD:admin}

  jwt:
    secret: ${JWT_SECRET:1234567890123456789012345678901234567890123456789012345678901234}
    expirationMs: 86400000

  gemini:
    api-key: ${GEMINI_API_KEY:default_fallback_if_needed}
  ```
* *Trong tệp Java*:

  ```java
  import org.springframework.beans.factory.annotation.Value;
  import org.springframework.stereotype.Component;

  @Component
  public class GeminiClient {
      @Value("${gemini.api-key}")
      private String apiKey;

      // Use apiKey for requests...
  }
  ```

---

---

## PHẦN III: CẤU TRÚC THƯ MỤC DỰ ÁN TIÊU CHUẨN (STANDARD BACKEND PROJECT STRUCTURE)

Toàn bộ dự án Backend Spring Boot sẽ được tổ chức phân cấp thư mục đồng nhất theo cấu trúc chuẩn hóa sau:

```
my-backend-project/
├── .mvn/                                    # Thư mục cấu hình chạy Maven Wrapper
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── company/
│   │   │           └── projectname/
│   │   │               ├── config/          # Cấu hình hệ thống (CORS, Swagger/OpenAPI, JPA, Redis...)
│   │   │               ├── constant/        # Lưu trữ hằng số, Enum định nghĩa trạng thái, mã lỗi
│   │   │               ├── controller/      # Tầng tiếp nhận Request (REST Controllers)
│   │   │               ├── exception/       # Xử lý lỗi API tập trung (Global Exception Handler)
│   │   │               ├── model/         
│   │   │               │   ├── dto/         # Dữ liệu truyền nhận qua API
│   │   │               │   │   ├── request/ # Data từ Client gửi lên (ví dụ: RegisterRequest)
│   │   │               │   │   └── response/# Data BE trả về cho Client (ví dụ: UserResponse)
│   │   │               │   └── entity/      # Đối tượng ánh xạ trực tiếp xuống Database (JPA Entities)
│   │   │               ├── repository/      # Tương tác truy vấn DB (Spring Data JPA / MyBatis)
│   │   │               ├── security/        # Cấu hình bảo mật (Spring Security, JWT Filters, UserDetails)
│   │   │               ├── service/         # Tầng xử lý Logic nghiệp vụ (Business Logic)
│   │   │               │   ├── impl/        # Lớp thực thi (Implementation) của các Service
│   │   │               │   └── UserService.java # Interface định nghĩa nghiệp vụ
│   │   │               ├── utils/           # Các hàm tiện ích (Format, JWT token generator, Mapper...)
│   │   │               └── BackendApplication.java # File khởi chạy chính của ứng dụng
│   │   │
│   │   └── resources/
│   │       ├── db/
│   │       │   └── migration/               # Quản lý phiên bản DB bằng Flyway hoặc Liquibase (Bắt buộc)
│   │       ├── application.yml              # File cấu hình chung của toàn dự án
│   │       ├── application-dev.yml          # Cấu hình riêng cho môi trường Development (máy local)
│   │       └── application-prod.yml         # Cấu hình riêng cho môi trường Production (server thực tế)
│   │
│   └── test/                                # Thư mục viết Unit Test & Integration Test (JUnit, Mockito)
│       └── java/
├── .gitignore                               # Quy định các file/thư mục không được đẩy lên Git
├── Dockerfile                               # File đóng gói ứng dụng thành Docker Image để deploy
├── pom.xml                                  # File quản lý thư viện và cấu hình build của Maven
└── README.md                                # Tài liệu hướng dẫn cài đặt và chạy dự án
```
